from django.db import models


class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)
    joining_date = models.DateField()

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(
        max_length=10,
        choices=[
            ('Present', 'Present'),
            ('Absent', 'Absent'),
        ]
    )

    class Meta:
        unique_together = ('employee', 'date')
        ordering = ['-id']

    def __str__(self):
        return f"{self.employee.name} - {self.date}"
