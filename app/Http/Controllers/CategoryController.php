<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    function index()
    {
        $categories = Category::with('subCategories:id,category_id,name')
            ->get(['id','name']);

        return Inertia::render('admin/category/Index',['categories' => $categories]);
    }

    function storeOrUpdate(Request $request,Category $category)
    {
        $request->validate([
            'name' => ['required', 'max:50'],
            'sub_categories' => ['required'],
            'sub_categories.*.name' => ['required']
        ]);

        $category->fill([
            'name' => $request->input('name'),
        ])->save();

        $ids = data_get($request->sub_categories,'*.id');

        SubCategory::whereNotIn('id',$ids)->delete();

        foreach ($request->sub_categories as $value) {
            SubCategory::updateOrCreate(
                ['id' => $value['id'],'category_id' => $category->id],
                ['name' => $value['name']]
            );
        }
    }

    function destroy($category){
        SubCategory::where('category_id',$category)->delete();
        Category::find($category)->delete();
        return redirect()->route('category.index');
    }

}
