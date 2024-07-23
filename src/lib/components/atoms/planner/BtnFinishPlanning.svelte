<script lang="ts">
	export let toggleOverlay: () => void;
</script>

<button
	class="mx-2 flex items-center rounded-[4px] bg-neutral-700 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
	on:click={toggleOverlay}
>
	<svg class="ml-1 h-4 fill-zinc-300 px-1" viewBox="0 0 56 56">
		<path
			d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906 0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906Zm0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922 11.039 0 19.921 8.883 19.945 19.922.023 11.063-8.883 19.922-19.922 19.922Zm-2.953-8.203c.773 0 1.406-.375 1.898-1.102l11.578-18.21c.282-.47.563-1.009.563-1.524 0-1.078-.938-1.735-1.922-1.735-.633 0-1.219.352-1.64 1.055L24.93 35.148l-5.438-7.03c-.515-.704-1.078-.962-1.71-.962-1.032 0-1.852.844-1.852 1.899 0 .515.21 1.008.539 1.453l6.562 8.11c.633.773 1.242 1.1 2.016 1.1Z"
		/>
	</svg>
	<div
		class="flex flex-col py-[6px] pr-2 text-[8px] font-medium leading-none tracking-tight text-zinc-300"
	>
		<p>
			Finish<br />
			Planning
		</p>
	</div>
</button>
