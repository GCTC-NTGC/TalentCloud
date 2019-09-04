@if ($crud->hasAccess('update') && $entry->status() === 'draft')
<a href="{{ route('manager.jobs.edit', $entry->id) }} " target="_blank" class="btn btn-xs btn-default"><i class="fa fa-edit"></i>JPB</a>
@endif
