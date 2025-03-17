from django.urls import path 
from . import views

app_name = "widget_homepage"
urlpatterns = [
    path("widget-homepage/", views.widget_homepage, name="widget-homepage")
]
