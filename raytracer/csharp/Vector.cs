using System;

namespace SimpleRaytracing
{
    public struct Vector
    {
        public float x, y, z;
        public Vector(float xx, float yy, float zz)
        {
            x = xx;
            y = yy;
            z = zz;
        }

        public static Vector times(float k, Vector v)
        {
            return new Vector(k * v.x, k * v.y, k * v.z);
        }

        public static Vector minus(Vector v1, Vector v2)
        {
            return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        }

        public static Vector plus(Vector v1, Vector v2)
        {
            return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
        }

        public static float dot(Vector v1, Vector v2)
        { 
            return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        }

        public static float mag(Vector v)
        {
            return (float) Math.Sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        }

        public static Vector norm(Vector v)
        {
            float mag = Vector.mag(v);
            return times(1.0F / mag, v);
        }

        public static Vector cross(Vector v1, Vector v2)
        {
            return new Vector(v1.y * v2.z - v1.z * v2.y,
                              v1.z * v2.x - v1.x * v2.z,
                              v1.x * v2.y - v1.y * v2.x);
        }
    }
}
