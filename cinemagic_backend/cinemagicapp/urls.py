from django.urls import path
from .views import *

urlpatterns = [
    path("movie/", MovieView.as_view(), name="Movie-view"),
    path("movieview/", MovieView.as_view(), name="movie-all"),
    path("moviesearch/", SearchMovieView.as_view(), name="search-movie"),
    path('login/', LoginView.as_view(), name="login-view"),
    path('register/', RegisterUserView.as_view(), name="register-view"),
    path('city/', CityView.as_view(), name="city-view"),
    path('theater/<str:name>', TheaterView.as_view(), name="city-view"),
    path('booking/', BookingView.as_view(), name="booking-view"),
    path('bookedseat/', BookedSeatView.as_view(), name="booked-seat-view"),
    path('userupdate/<int:id>', UpdateUserView.as_view(), name="register-view"),
    path('usertickets/<int:id>', BookedTicketView.as_view(), name="register-view"),
]
