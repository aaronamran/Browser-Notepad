export default class NotesView {
	constructor(
		root,
		{ onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
	) {
		this.root = root;
		this.onNoteSelect = onNoteSelect;
		this.onNoteAdd = onNoteAdd;
		this.onNoteEdit = onNoteEdit;
		this.onNoteDelete = onNoteDelete;
		this.root.innerHTML = `
            <div class="notes__sidebar">
			<p class="intro__text">Browser Notepad - by Aaron A.</p>
			<button class="notes__add" type="button">Add New Note</button>
			<div class="notes__list"></div>
            </div>
            <div class="notes__preview">
			<input class="notes__title" type="text" placeholder="New Note Title...">
			<textarea class="notes__body" placeholder="Type something..."></textarea>
			</div>
        `;

		const btnAddNote = this.root.querySelector(".notes__add");
		const inpTitle = this.root.querySelector(".notes__title");
		const inpBody = this.root.querySelector(".notes__body");

		btnAddNote.addEventListener("click", () => {
			this.onNoteAdd();
		});

		[inpTitle, inpBody].forEach((inputField) => {
			inputField.addEventListener("blur", () => {
				const updatedTitle = inpTitle.value.trim();
				const updatedBody = inpBody.value.trim();

				this.onNoteEdit(updatedTitle, updatedBody);
			});

			// Capture the Tab key in the textarea to ensure Tab works in textarea
            if (inputField.tagName.toLowerCase() === "textarea") {
                inputField.addEventListener("keydown", (event) => {
                    if (event.key === "Tab") {
                        event.preventDefault(); // Prevent the default Tab behavior
                        const cursorPos = inputField.selectionStart;
                        const textBefore = inputField.value.substring(0, cursorPos);
                        const textAfter = inputField.value.substring(cursorPos);
                        inputField.value = textBefore + "\t" + textAfter;
                        inputField.setSelectionRange(cursorPos + 1, cursorPos + 1);
                    }
                });
            }
		});

		this.updateNotePreviewVisibility(false);
	}

	_createListItemHTML(id, title, body, updated) {
		// Use || to check for truthy values
		// Title and Body in the left sidebar will update once placeholder texts are replaced
		const MAX_BODY_LENGTH = 60;

		return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title || "New Note"}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH) || "Content"}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, {
											dateStyle: "full",
											timeStyle: "short",
										})}
                </div>
				<button class="notes__delete" type="button">Delete</button>
            </div>
        `;
	}

	updateNoteList(notes) {
		const notesListContainer = this.root.querySelector(".notes__list");

		// Empty list
		notesListContainer.innerHTML = "";

		for (const note of notes) {
			const html = this._createListItemHTML(
				note.id,
				note.title,
				note.body,
				new Date(note.updated)
			);

			notesListContainer.insertAdjacentHTML("beforeend", html);
		}

		// Add select/delete events for each list item
		notesListContainer
			.querySelectorAll(".notes__list-item")
			.forEach((noteListItem) => {
				noteListItem.addEventListener("click", () => {
					this.onNoteSelect(noteListItem.dataset.noteId);
				});

				noteListItem.querySelector(".notes__delete").addEventListener("click", (event) => {
					event.stopPropagation(); // Prevent the click from triggering the parent click event
					const doDelete = confirm("Are you sure you want to delete this note?");
					if (doDelete) {
						this.onNoteDelete(noteListItem.dataset.noteId);
						this._refreshNotes();
					}
				});
			});
	}

	updateActiveNote(note) {
		this.root.querySelector(".notes__title").value = note.title;
		this.root.querySelector(".notes__body").value = note.body;

		this.root.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
			noteListItem.classList.remove("notes__list-item--selected");
		});

		this.root
			.querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
			.classList.add("notes__list-item--selected");
	}

	updateNotePreviewVisibility(visible) {
		this.root.querySelector(".notes__preview").style.visibility = visible
			? "visible"
			: "hidden";
	}
}
