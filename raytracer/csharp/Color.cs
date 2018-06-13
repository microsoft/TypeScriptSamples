using System;

namespace SimpleRaytracing
{
    public class Color
    {
        public float r, g, b;

        public Color(float rr, float gg, float bb)
        {
            r = rr;
            g = gg;
            b = bb;
        }

        public static Color scale(float k, Color v)
        {
            return new Color(k * v.r, k * v.g, k * v.b);
        }

        public static Color plus(Color v1, Color v2)
        {
            return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
        }

        public static Color times(Color v1, Color v2)
        {
            return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
        }

        public static Color white = new Color(1.0F, 1.0F, 1.0F);
        public static Color grey = new Color(0.5F, 0.5F, 0.5F);
        public static Color black = new Color(0.0F, 0.0F, 0.0F);
        public static Color background = Color.black;
        public static Color defaultColor = Color.black;

        static float legalize(float d) { return d > 1.0F ? 1.0F : d; }

        public static Color toDrawingColor(Color c)
        {
            return new Color(
                (float) Math.Floor(legalize(c.r) * 255.0F),
                (float) Math.Floor(legalize(c.g) * 255.0F),
                (float) Math.Floor(legalize(c.b) * 255.0F));
        }

    }
}
