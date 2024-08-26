let editIndex = null;



// メモを保存する関数
function saveNote() {
    const editorContent = document.getElementById('editor').value;
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (editIndex !== null) {
        notes[editIndex].content = editorContent;
        editIndex = null;
        document.getElementById('save-btn').style.display = 'inline-block';
        document.getElementById('edit-btn').style.display = 'none';
        document.getElementById('cancel-btn').style.display = 'none';
    } else {
        notes.push({ content: editorContent, date: new Date().toLocaleString() });
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    document.getElementById('editor').value = ''; // ここでtextareaを空にする
}

// メモを表示する関数
function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <div>${note.content}</div>
            <small>${note.date}</small>
            <button onclick="editNote(${index})">編集</button>
            <button onclick="deleteNote(${index})">削除</button>
        `;
        notesList.appendChild(noteElement);
    });
}

// メモを編集する関数
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    document.getElementById('editor').value = notes[index].content;
    editIndex = index;
    document.getElementById('save-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'inline-block';
    document.getElementById('cancel-btn').style.display = 'inline-block';
}

// 編集をキャンセルする関数
function cancelEdit() {
    document.getElementById('editor').value = '';
    editIndex = null;
    document.getElementById('save-btn').style.display = 'inline-block';
    document.getElementById('edit-btn').style.display = 'none';
    document.getElementById('cancel-btn').style.display = 'none';
}



// メモを削除する関数
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// イベントリスナーの設定
document.getElementById('save-btn').addEventListener('click', saveNote);
document.getElementById('edit-btn').addEventListener('click', saveNote);
document.getElementById('cancel-btn').addEventListener('click', cancelEdit);

// 初期表示
displayNotes();
