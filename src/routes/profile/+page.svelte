<script lang="ts">
  import { enhance } from "$app/forms";

  let previewUrl: string | null = null;

  function handleFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
      previewUrl = URL.createObjectURL(files[0]);
    } else {
      previewUrl = null;
    }
  }

</script>

<form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance>
  <input type="file" name="image" accept="image/*" on:change={handleFileChange} />
  <button type="submit">Upload Image</button>
</form>

{#if previewUrl}
  <img src={previewUrl} alt="Preview" style="max-width:200px;max-height:200px" />
{/if}