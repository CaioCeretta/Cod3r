<script>
	export let autor = null
</script>

{#if autor}
	<a
		href="/autores/{autor.id}"
		class="flex flex-col rounded-md relative
    overflow-hidden border border-zinc-800"
	>
		<img
			src={autor.imagem}
			alt="Foto do autor"
			class="h-96 object-cover"
		/>
		<div
			class="absolute bottom-0 flex px-6 py-4 bg-black/50 w-full justify-end"
		>
			<span class="text-2xl font-black">{autor.nome}</span>
		</div>
	</a>
{/if}
