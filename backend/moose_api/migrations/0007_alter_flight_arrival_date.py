# Generated by Django 4.1.6 on 2023-03-31 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('moose_api', '0006_flight_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flight',
            name='arrival_date',
            field=models.DateField(null=True),
        ),
    ]