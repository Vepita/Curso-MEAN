import { Post } from './../post.model';
import { PostService } from './../posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    /*
     posts = [
         {title: 'First Post', content: 'This is the first post\'s content'},
         {title: 'Second Post', content: 'This is the second post\'s content'},
         {title: 'Third Post', content: 'This is the third post\'s content'},
     ]
     */
    posts: Post[] = [];
    private postsSub: Subscription;

    postsService: PostService;
    constructor(public postService: PostService) {
        this.postsService = postService;
        this.postsSub = this.postService.getPostUdateListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
    }

    ngOnInit() {
        this.posts = this.postsService.getPosts();
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}