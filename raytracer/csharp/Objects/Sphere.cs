using System;

namespace SimpleRaytracing
{
    public class Sphere : Thing
    {
        public float radius2;
        public Vector center;
        public float radius;
        public Surface surface { get; set; }

        public Sphere(Vector c, float r, Surface s)
        {
            center = c;
            radius = r;
            surface = s;
            radius2 = radius * radius;
        }

        public Vector normal(Vector pos)
        {
            return Vector.norm(Vector.minus(pos, this.center));
        }

        public Intersection intersect(Ray ray)
        {
            var eo = Vector.minus(this.center, ray.start);
            var v = Vector.dot(eo, ray.dir);
            var dist = 0.0F;
            if (v >= 0)
            {
                var disc = this.radius2 - (Vector.dot(eo, eo) - v * v);
                if (disc >= 0)
                {
                    dist = v - (float)Math.Sqrt(disc);
                }
            }
            if (dist == 0)
            {
                return new Intersection { dist = float.MaxValue };
            }
            else
            {
                return new Intersection { dist = dist, ray = ray, thing = this };
            }
        }

    }
}
