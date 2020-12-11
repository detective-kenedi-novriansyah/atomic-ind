<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Purse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $params = $request->params;
        if($params) {
            $data = Category::orderBy('code')->paginate($params)->withQueryString();
        } else {
            $data = Category::orderBy('code')->paginate(5)->withQueryString();
        }
        
        $result = CategoryResource::collection($data);
        return response()->json([
            'data' => $result,
            'nextPageUrl' => $data->nextPageUrl(),
            "prevPageUrl" => $data->previousPageUrl(),
            "links" => $data->getUrlRange($data->currentPage(),$data->total() / $data->count()),
            'count' => $data->count(),
            "total" => $data->total(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validators = Validator::make($request->all(), [
            'code' => 'required',
            'description' => 'required',
            'category' => 'required',
            'value' => 'required',
            'user_id' => 'required',
        ]);
        if($validators->fails()) {
            return response()->json([
                'message' => $validators->errors()
            ]);
        };
        $create = Category::create([
            'code' => $request->code,
            'description' => $request->description,
            'category' => $request->category,
            'value' => $request->value,
            'purse' => $request->purse,
            'user_id' => User::find($request->user_id),
        ]);
        $create->save();
        return response()->json([
            'data' => $create,
            'message' => 'Category has been created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $find = Category::find($id);
        if(!$find) {
            return response()->json([
                'message' => 'Category not found'
            ]);
        }
        return response()->json([
            'data' => new CategoryResource($find)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validators = Validator::make($request->all(), [
            'code' => 'required',
            'description' => 'required',
            'category' => 'required',
            'value' => 'required',
        ]);
        if($validators->fails()) {
            return response()->json([
                'message' => $validators->errors()
            ]);
        };
        $update = Category::find($id);
        $update->code = $request->code;
        $update->description = $request->description;
        $update->category = $request->category;
        $update->value = $request->value;
        $update->save();
        return response()->json([
            'message' => 'Category has been updated',
            'data' => $update
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = Category::find($id);
        if(!$find) {
            return response()->json([
                'message' => 'Category not found'
            ],400);
        };
        $find->delete();
        return response()->json([
            'message' => 'Category has been deleted',
        ]);
    }
}
