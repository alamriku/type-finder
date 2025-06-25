<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function store(Request $request)
    {
        $post = Post::create($request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]));

        return response()->json($post, 201);
    }
}
