export default function randomAvatar() {
    const avatars = [
      "https://avatar.iran.liara.run/public/33",
      "https://avatar.iran.liara.run/public/9",
      "https://avatar.iran.liara.run/public/48",
      "https://avatar.iran.liara.run/public/10",
      "https://avatar.iran.liara.run/public/19",
      "https://avatar.iran.liara.run/public/49",
      "https://avatar.iran.liara.run/public/42",
      "https://avatar.iran.liara.run/public/23",
      "https://avatar.iran.liara.run/public/26",
      "https://avatar.iran.liara.run/public/20",

      "https://avatar.iran.liara.run/public/86",
      "https://avatar.iran.liara.run/public/81",
      "https://avatar.iran.liara.run/public/79",
      "https://avatar.iran.liara.run/public/92",
      "https://avatar.iran.liara.run/public/71",
      "https://avatar.iran.liara.run/public/59",
      "https://avatar.iran.liara.run/public/56",
      "https://avatar.iran.liara.run/public/95",
      "https://avatar.iran.liara.run/public/57",
      "https://avatar.iran.liara.run/public/89",

    ];
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  }