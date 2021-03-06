<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurseCollection;
use App\Models\Purse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Validator;

class PurseController extends Controller
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
            $data = Purse::orderBy('name')->paginate($params)->withQueryString();
        } else {
            $data = Purse::orderBy('name')->paginate(5)->withQueryString();
        }
        
        $result = PurseCollection::collection($data);
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
            'name' => 'required|min:5',
            'reference' => 'required',
            'description' => 'required|max:100',
        ]);
        if($validators->fails()) {
            return response()->json([
                'message' => $validators->errors()
            ], 400);
        }
        $create = Purse::create([
            'user_id' => User::find($request->user_id)->id,
            'name' => $request->name,
            'status' => $request->status,
            'reference' => $request->reference,
            'description' => $request->description,
        ]);
        $create->save();

        return response()->json([
            'message' => 'Purse has been created',
            'data' => $create
        ],201);
    }

    public function active(Request $request, $id)
    {
        $find = Purse::find($id);
        $find->status = $request->status;
        $find->save();
        return response()->json([
            'message' => 'Purse has been change active',
            'purse' => $find
        ], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $find = Purse::find($id);
        return response()->json([
            'data' => new PurseCollection($find)
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
            'name' => 'required|min:5',
            'description' => 'required|max:100',
            'status' => 'required'
        ]);
        if($validators->fails()) {
            return response()->json([
                'message' => $validators->errors()
            ], 400);
        }
        $purse = Purse::find($id);
        $purse->name = $request->name;
        $purse->description = $request->description;
        $purse->status = $request->status;
        $purse->save();
        return response()->json([
            'message' => 'Purse has been updated',
            'data' => new PurseCollection($purse)
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = Purse::find($id);
        $find->status = 0;
        $find->save();
        return response()->json([
            'message' => 'Purse has been deleted'
        ],200);
    }
}
