from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def widget_homepage(request): 
    return render(request, 'widget_homepage/index.html', {})
