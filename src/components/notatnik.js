const getWords = (ids) => {
  let words = [];
  let rootId, nextId, nextCell, word, help, collumnId, rowId;

  for (let i = 0; i < ids.length; i++) {
    word = "";
    rootId = ids[1];
    nextId = getNextId("Poziomo", rootId, true);
    nextCell = document.getElementById(nextId);
    help = rootId.lastIndexOf("-");
    collumnId = parseInt(rootId.substring(help + 1));

    while (nextCell.value !== "") {
      word += nextCell.value;
      if (collumnId === 18) {
        break;
      }
      nextId = getNextId("Poziomo", rootId, true);
      nextCell = document.getElementById(nextId);
      help = nextId.lastIndexOf("-");
      collumnId = parseInt(nextId.substring(help + 1));
    }

    if (word !== "") {
      const wordObj = {
        word: word,
        cordinates: rootId,
        direction: "Poziomo",
        cellNum:
          document.getElementById(rootId).previousElementSibling.innerHTML,
      };
      words.push(wordObj);
      word = "";
    }

    nextId = getNextId("Pionowo", rootId, true);
    nextCell = document.getElementById(nextId);
    help = rootId.lastIndexOf("-");
    rowId = parseInt(rootId.substring(0, help));

    while (nextCell.value !== "") {
      word += nextCell.value;
      if (rowId === 18) {
        break;
      }
      nextId = getNextId("Poziomo", rootId, true);
      nextCell = document.getElementById(nextId);
      help = nextId.lastIndexOf("-");
      rowId = parseInt(nextId.substring(0, help));
    }
    if (word !== "") {
      const wordObj = {
        word: word,
        cordinates: rootId,
        direction: "Pionowo",
        cellNum:
          document.getElementById(rootId).previousElementSibling.innerHTML,
      };
      words.push(wordObj);
      word = "";
    }
  }
  return words;
};
