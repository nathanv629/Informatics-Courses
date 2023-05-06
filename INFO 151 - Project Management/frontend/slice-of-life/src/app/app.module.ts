import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './pages/feed/feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { SidebarComponent } from './UI/sidebar/sidebar.component';
import { PostComponent } from './UI/post/post.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FeedService } from './data/feed.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatExpansionModule} from '@angular/material/expansion';
import { CommentComponent } from './UI/comment/comment.component';
import { PostService } from './data/post.service';
import { ThreadComponent } from './UI/thread/thread.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SidebarComponent,
    PostComponent,
    CommentComponent,
    ThreadComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule
    
  ],
  providers: [FeedService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
