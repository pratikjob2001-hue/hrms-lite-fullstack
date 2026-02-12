from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'name', 'email', 'department', 'joining_date']

    # # ✅ Validate Employee ID uniqueness
    # def validate_employee_id(self, value):
    #     if Employee.objects.filter(employee_id=value).exists():
    #         raise serializers.ValidationError("Employee ID already exists.")
    #     return value

    # # ✅ Validate Email uniqueness
    # def validate_email(self, value):
    #     if Employee.objects.filter(email=value).exists():
    #         raise serializers.ValidationError("Email already exists.")
    #     return value

# Validate Employee ID uniqueness (Update Safe)
    def validate_employee_id(self, value):
        queryset = Employee.objects.filter(employee_id=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Employee ID already exists.")

        return value


    # ✅ Validate Email uniqueness (Update Safe)
    def validate_email(self, value):
        queryset = Employee.objects.filter(email=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Email already exists.")

        return value


class AttendanceSerializer(serializers.ModelSerializer):

    employee_name = serializers.CharField(
        source='employee.name',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'date', 'status']

    # ✅ Prevent duplicate attendance for same employee on same date
    # def validate(self, data):
    #     employee = data.get("employee")
    #     date = data.get("date")

    #     if Attendance.objects.filter(employee=employee, date=date).exists():
    #         raise serializers.ValidationError(
    #             "Attendance already marked for this employee on this date."
    #         )

    #     return data
    # ✅ Prevent duplicate attendance for same employee on same date
    def validate(self, data):
        employee = data.get("employee")
        date = data.get("date")

        queryset = Attendance.objects.filter(employee=employee, date=date)

        # Exclude current instance during update
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date."
            )

        return data

