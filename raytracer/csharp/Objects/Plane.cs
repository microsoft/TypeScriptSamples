namespace SimpleRaytracing
{
    class Plane : Thing
    {
        Vector norm;
        float offset;
        public Surface surface { get; set; }
        public Plane(Vector n, float o, Surface s)
        {
            norm = n;
            offset = o;
            surface = s;
        }

        public Vector normal(Vector pos) { return norm; }
        public Intersection intersect(Ray ray)
        {
            var denom = Vector.dot(norm, ray.dir);

            if (denom > 0)
            {
                return new Intersection { dist = float.MaxValue };
            }
            else
            {
                var dist = (Vector.dot(norm, ray.start) + offset) / (-denom);
                return new Intersection { dist = dist, ray = ray, thing = this };
            }
        }
    }
}
