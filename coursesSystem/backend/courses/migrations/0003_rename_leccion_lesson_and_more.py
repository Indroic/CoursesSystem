# Generated by Django 5.0.6 on 2024-06-11 19:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_alter_leccion_description'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Leccion',
            new_name='Lesson',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='num_leccions',
            new_name='num_lessons',
        ),
    ]
