// Copyright (c) 2024 Oscar Alexander Casas
// Licensed under the Commercial Use License. For inquiries, contact alexandercasasnqn@gmail.com
export function isPostRequest(request: Request) {
  return request.method.toUpperCase() === "POST";
}
