"use server";

export const getAllTestimonials = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API}/testimonials.json`,
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
