from django.contrib import admin
from rest_framework import routers

import planes.urls
import users.urls

router = routers.DefaultRouter()
router.registry.extend(users.urls.router.registry)
router.registry.extend(planes.urls.router.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]
