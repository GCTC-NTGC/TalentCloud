<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComment;
use App\Models\Comment;
use App\Models\JobPoster;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    /**
     * Get the set of comments associated with a Job.
     *
     * @param JobPoster $jobPoster
     * @return \Illuminate\Http\Response
     */
    public function indexByJob(JobPoster $jobPoster)
    {
      Log::debug($jobPoster->id);
          $comments = Comment::where('job_poster_id', $jobPoster->id)->get();
          return new ResourceCollection($comments);
    }

    /**
     * Store a newly created resource in storage
     *
     * @param \App\Http\Requests\StoreComment $request Incoming request.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComment $request)
    {
          $data = $request->validated();
          $comment = new Comment();
          $comment->fill($data);
          $comment->save();
          return new JsonResource($comment);
    }
}
