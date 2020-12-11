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
            $data = Purse::where('status', true)->paginate($params)->withQueryString();
        } else {
            $data = Purse::where('status', true)->paginate(5)->withQueryString();
        }
        
        $result = PurseCollection::collection($data);
        return response()->json([
            'data' => $result,
            'nextPageUrl' => $data->nextPageUrl(),
            "prevPageUrl" => $data->previousPageUrl(),
            "links" => $data->getUrlRange(1,$data->total() / $data->count()),
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
            'name' => 'required',
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
