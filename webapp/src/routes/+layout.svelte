<script>
	import { PUBLIC_PLATFORM_APP_BASE_URL } from '$env/static/public';
	import '../app.css';
</script>

<main class="bg-secondary min-h-screen min-w-full p-2">
	<slot></slot>
	<div class="absolute inset-x-0 bottom-0 p-2">
		<a href={PUBLIC_PLATFORM_APP_BASE_URL}>Lockform</a>
	</div>
</main>
