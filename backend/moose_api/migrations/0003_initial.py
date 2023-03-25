# Generated by Django 4.1.6 on 2023-03-17 18:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('moose_api', '0002_delete_wine'),
    ]

    operations = [
        migrations.CreateModel(
            name='Itinerary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('itinerary_name', models.CharField(max_length=250)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Sight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sight_name', models.CharField(max_length=250)),
                ('itinerary_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moose_api.itinerary')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Rental',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rental_company', models.CharField(default='', max_length=250)),
                ('pick_up_location', models.CharField(max_length=250)),
                ('return_location', models.CharField(max_length=250)),
                ('pick_up_date', models.DateField()),
                ('return_date', models.DateField()),
                ('itinerary_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moose_api.itinerary')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hotel_name', models.CharField(max_length=250)),
                ('location', models.CharField(max_length=250)),
                ('check_in_date', models.DateField()),
                ('check_out_date', models.DateField()),
                ('itinerary_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moose_api.itinerary')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flight_type', models.CharField(max_length=250)),
                ('departure', models.CharField(max_length=250)),
                ('destination', models.CharField(max_length=250)),
                ('arrival_date', models.DateField()),
                ('departure_date', models.DateField()),
                ('itinerary_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moose_api.itinerary')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Affinity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('affinity_type', models.CharField(max_length=250)),
                ('itinerary_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moose_api.itinerary')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
