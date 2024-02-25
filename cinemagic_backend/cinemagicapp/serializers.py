from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validation_data):
        user = User.objects.create_user(**validation_data)
        return user
    def update(self,user, validation_data):
        user = User.objects.update_user(user,**validation_data)
        return user

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password")

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"

class TheaterSerializer(serializers.ModelSerializer):
    city = CitySerializer(many=True)
    class Meta:
        model = Theater
        fields = "__all__"

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['row', 'seat_no', 'price']

class BookingSerializer(serializers.ModelSerializer):
    seat_details = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['seat_details']

    def get_seat_details(self, obj):
        seats = Seat.objects.filter(booking=obj)
        return SeatSerializer(seats, many=True).data
    
class MovieTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["title"]
class TheaterNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = ["name"]

class BookedTicketSerializer(serializers.ModelSerializer):
    seat_details = serializers.SerializerMethodField()
    city = CitySerializer()
    movie = MovieTitleSerializer()
    theater = TheaterNameSerializer()
    class Meta:
        model = Booking
        fields = "__all__"

    def get_seat_details(self, obj):
        seats = Seat.objects.filter(booking=obj)
        return SeatSerializer(seats, many=True).data


class BookingWithSeatsSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, required=False)

    class Meta:
        model = Booking
        fields = ['booking_id', 'user', 'movie', 'time','date', 'theater', 'city', 'seats']

    def create(self, validated_data):
        seats_data = validated_data.pop('seats', [])
        booking = Booking.objects.create(**validated_data)

        for seat_data in seats_data:
            Seat.objects.create(booking=booking, **seat_data)

        return booking


