<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'bail|required|date',
            'time' => 'bail|required|date_format:H:i',
            'sub_category' => 'bail|required',
            'vendor' => 'bail|required',
            'amount' => 'bail|required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'date.required' => 'The date field is required.',
            'time.required' => 'The time field is required.',
            'sub_category.required' => 'The sub category field is required.',
            'vendor.required' => 'The vendor field is required.',
            'amount.required' => 'The amount field is required.',

            'date.date' => 'please enter data in date formate.',
            'time.date_format' => 'please enter time in time formate.',
            'amount.numeric' => 'please enter amount in numeric formate.',
        ];
    }
}
