@if ($crud->hasAccess('update') && $entry->status() === 'draft')
<a href="{{ route('admin.jobs.edit', $entry->id) }} " target="_blank" class="btn btn-xs btn-default"><i class="fa fa-edit"></i>Admin Edit</a>
@endif
