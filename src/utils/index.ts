/**
 * @param prisma
 * @param email
 *
 * @returns User Object by email.
 */
export const getUser = (dataSource, email: string) =>
  dataSource.user.findUnique({
    where: {
      email: email,
    },
    include: {
      profile: true,
    },
  });
