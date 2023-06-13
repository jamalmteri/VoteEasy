# Generated by Django 4.1.7 on 2023-06-07 16:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('VoteEasyApp', '0002_delete_userregistration'),
    ]

    operations = [
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('party', models.CharField(max_length=100)),
                ('position', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TanzaniaRegion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.CharField(choices=[('AR', 'Arusha'), ('DS', 'Dar es Salaam'), ('DO', 'Dodoma'), ('IR', 'Iringa'), ('KA', 'Kagera'), ('KI', 'Kigoma'), ('KJ', 'Kilimanjaro'), ('LN', 'Lindi'), ('MA', 'Manyara'), ('MR', 'Mara'), ('MB', 'Mbeya'), ('MO', 'Morogoro'), ('MT', 'Mtwara'), ('MU', 'Mwanza'), ('NJ', 'Njombe'), ('PN', 'Pemba North'), ('PS', 'Pemba South'), ('PW', 'Pwani'), ('RK', 'Rukwa'), ('RV', 'Ruvuma'), ('SH', 'Shinyanga'), ('SI', 'Simiyu'), ('TB', 'Tabora'), ('TN', 'Tanga'), ('ZH', 'Zanzibar Central/South'), ('ZN', 'Zanzibar North'), ('ZU', 'Zanzibar Urban/West')], max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Election',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('candidates', models.ManyToManyField(related_name='elections', to='VoteEasyApp.candidate')),
            ],
        ),
        migrations.AddField(
            model_name='candidate',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='VoteEasyApp.tanzaniaregion'),
        ),
    ]