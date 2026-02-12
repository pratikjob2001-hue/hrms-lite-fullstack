from rest_framework import viewsets
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# class AttendanceViewSet(viewsets.ModelViewSet):
#     queryset = Attendance.objects.all()
#     serializer_class = AttendanceSerializer

#     def get_queryset(self):
#         queryset = Attendance.objects.all()
#         employee_id = self.request.query_params.get('employee')
#         date = self.request.query_params.get('date')

#         if employee_id:
#             queryset = queryset.filter(employee_id=employee_id)

#         if date:
#             queryset = queryset.filter(date=date)

#         return queryset


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all().order_by('-id')
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = Attendance.objects.all().order_by('-id')
        employee_id = self.request.query_params.get('employee')
        date = self.request.query_params.get('date')

        if employee_id:
            queryset = queryset.filter(employee__id=employee_id)

        if date:
            queryset = queryset.filter(date=date)

        return queryset
