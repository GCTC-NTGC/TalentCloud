@if ($crud->hasAccess('update'))
<br /><a href="{{ route('manager.jobs.screening_plan', $entry->id) }} " target="_blank" class="btn btn-sm btn-link"><i class="fa fa-edit"></i>SPB</a>
@endif
