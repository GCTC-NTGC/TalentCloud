<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComment;
use App\Models\Comment;
use App\Models\JobPoster;
use Illuminate\Http\Request;
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
          $comments = Comment::where('job_poster_id', $jobPoster->id)->get();
          return response()->json(new ResourceCollection($comments));
    }

    /**
     * Store a newly created resource in storage
     *
     * @param \App\Http\Requests\StoreComment $request Incoming request.
     * @param  \App\Models\JobPoster          $jobPoster    Incoming Job Poster.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComment $request, JobPoster $jobPoster)
    {
          $data = $request->validated();
          $comment = new Comment();
          $comment->fill($data);
          $comment->save();
          return response()->json(new JsonResource($comment));
    }
}
