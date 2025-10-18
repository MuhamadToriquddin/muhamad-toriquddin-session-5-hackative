export function cleanAndFormatReview(text) {
  // 1. Hapus garis horizontal (---)
  let cleanedText = text.replace(/---/g, "");

  // 2. Hapus simbol bold/italic ganda (**)
  // Mengganti semua ** dengan string kosong
  cleanedText = cleanedText.replace(/\*\*/g, "");

  // 3. Hapus simbol italic/list tunggal (*)
  // Mengganti semua * dengan string kosong
  cleanedText = cleanedText.replace(/\*/g, "");

  // 4. Hapus simbol *italic* (misalnya: *logic* atau *automasi*)
  cleanedText = cleanedText.replace(/_logic_/g, "logic");
  cleanedText = cleanedText.replace(/_automasi_/g, "automasi");

  // 5. Menghapus whitespace di awal dan akhir
  cleanedText = cleanedText.trim();

  // 6. Mengganti angka list (1., 2., 3., dst.) di awal baris dengan spasi
  // agar terlihat lebih rapi di output teks non-bullet
  cleanedText = cleanedText.replace(/^(\d+\. )/gm, " ");

  // 7. Mengganti semua spasi ganda berturut-turut menjadi spasi tunggal,
  // untuk membersihkan sisa-sisa pembersihan bullet point
  cleanedText = cleanedText.replace(/[ \t]{2,}/g, " ");

  return cleanedText;
}
