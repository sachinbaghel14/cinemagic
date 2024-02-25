from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username is required")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def update_user(self, user, password, **extra_fields):
        for key, value in extra_fields.items():
            setattr(user, key, value)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    username = models.CharField(
        max_length=200, validators=[MinLengthValidator(3)], unique=True
    )
    phone_no = models.CharField(max_length=12)
    password = models.CharField(max_length=200, validators=[MinLengthValidator(6)])
    USERNAME_FIELD = "username"
    objects = UserManager()

class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)

class Theater(models.Model):
    therater_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    seating_capacity = models.IntegerField()
    city = models.ManyToManyField(City)

class Movie(models.Model):
    movie_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    coursel_img = models.URLField()
    card_img = models.URLField()
    category = models.CharField(max_length=200)
    year = models.IntegerField()
    duration = models.CharField(max_length=10)
    star_rating = models.FloatField()
    type_rating = models.CharField(max_length=20)
    director = models.CharField(max_length=50)
    actors = models.CharField(max_length=200)
    description = models.TextField()
    language = models.CharField(max_length=200, default='none')
    in_coursel = models.BooleanField()

class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_detail")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name = "movie_detail")
    time = models.CharField(max_length=200)
    date = models.CharField(max_length=200, null=True)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE, related_name = "theater_detail")
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name = "city_detail")


class Seat(models.Model):
    row = models.CharField(max_length = 2)
    seat_no = models.IntegerField()
    price = models.IntegerField(default=0)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="booking_detail")



# class tickets(models.Model):
#     quantity = models.IntegerField()
