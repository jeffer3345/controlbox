import prisma from "../../../lib/prisma";

// POST /api/post
export default async function handle(req, res) {
  const { score, comment, bookId, email } = req.body;

  const result = await prisma.comments.create({
    data: {
      score,
      comment,
      user: { connect: { email } },
      book: { connect: { id: bookId } },
    },
  });
  res.json(result);
}
