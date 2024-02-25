from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q, Sum, Avg


class MovieView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        movie = Movie.objects.all()
        serializer = MovieSerializer(movie, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        print(data)
        serializer = MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Movie created"}, status=status.HTTP_201_CREATED
            )
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SearchMovieView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data['search']
        if data["filter"] =='title':
            movie = Movie.objects.filter(title__icontains=data["search"]).distinct()
        elif data["filter"] =='genre':
            movie = Movie.objects.filter(category__icontains=data["search"]).distinct()
        elif data["filter"] =='rating':
            movie = Movie.objects.filter(type_rating__icontains=data["search"]).distinct()
        elif data["filter"] =='language':
            movie = Movie.objects.filter(language__icontains=data["search"]).distinct()
        serializer = MovieSerializer(movie, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        try:
            data = request.data
            user = User.objects.get(email=data["email"])
        except User.DoesNotExist:
            user = None
        if user and check_password(data["password"], user.password):
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "phone_no": user.phone_no,
                    "email": user.email,
                    "id": user.id
                }
            )
        else:
            return Response(
                {"message": "Invalid Email or Password"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        data["username"] = data["email"]
        userExist = User.objects.filter(
            Q(username=data["username"]) | Q(email=data["email"])
        )
        if userExist:
            return Response(
                {"message": "Account already exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User Account created"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, id):
        user = User.objects.get(id=id)
        data = request.data
        data["username"] = data["email"]
        serializer = UserSerializer(user, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User Account updated"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        city = City.objects.all()
        serializer = CitySerializer(city, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = CitySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "City added"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TheaterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, name):
        theater = Theater.objects.filter(city__name__icontains=name).distinct()
        serializer = TheaterSerializer(theater, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = TheaterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Theater added"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        user = User.objects.get(email=data["user"])
        movie = Movie.objects.get(title=data["movie"])
        theater = Theater.objects.get(name=data["theater"])
        city = City.objects.get(name=data["city"])

        ticket = {
            "user": user.id,
            "movie": movie.movie_id,
            "time": data["time"],
            "date": data["date"],
            "theater": theater.therater_id,
            "city": city.city_id,
            "seats": data["seats"]
            
        }
        serializer = BookingWithSeatsSerializer(data=ticket)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Ticket Booked"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class BookedSeatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        city = City.objects.get(name=data["city"])
        theater = Theater.objects.get(name=data["theater"])
        data["city"] = city.city_id
        data["theater"]=theater.therater_id,
        booking = Booking.objects.filter(Q(city=data["city"]) & Q(theater=data["theater"]) & Q(date=data["date"]) & Q(time=data["time"]) & Q(movie=data["movie"]))
        serializer = BookingSerializer(booking, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)
    
class BookedTicketView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        data = request.data
        booking = Booking.objects.filter(user=id)
        serializer = BookedTicketSerializer(booking, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)