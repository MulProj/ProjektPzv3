import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllHousesComponent } from './all-houses/all-houses.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './Service/http.service';
import {FormsModule} from '@angular/forms';
import { SafePipe } from './safe.pipe';
import { AddSensorsComponent } from './all-houses/add-sensors/add-sensors.component';
import { SensorsLayoutComponent } from './all-houses/sensors-layout/sensors-layout.component';
import { ViewSensorsComponent } from './all-houses/view-sensors/view-sensors.component';
import { HistoryComponent } from './all-houses/history/history.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LeftNavComponent,
    PageNotFoundComponent,
    AllHousesComponent,
    AddHouseComponent,
    SafePipe,
    AddSensorsComponent,
    SensorsLayoutComponent,
    ViewSensorsComponent,
    HistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  
  ],
  providers: [
    HttpService

  ],
  bootstrap: [
    AppComponent
  ],
  
})
export class AppModule { }
