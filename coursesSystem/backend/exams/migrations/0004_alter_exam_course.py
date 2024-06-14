# Generated by Django 5.0.6 on 2024-06-14 22:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_alter_course_level'),
        ('exams', '0003_alter_exam_course'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='course',
            field=models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='courses.course', verbose_name='Course'),
        ),
    ]
