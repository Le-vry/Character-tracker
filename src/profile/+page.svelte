<script>
	import { enhance } from "$app/forms";

</script>

<form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance>
  <input type="image" name="image" accept=".png/.jpg/.jpeg" alt="profilepicture" />
  <button type="submit">Upload Image</button>
</form>