from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow superusers to edit or delete articles.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request.
        # So we'll always allow GET, HEAD, or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to superusers.
        return request.user and request.user.is_superuser