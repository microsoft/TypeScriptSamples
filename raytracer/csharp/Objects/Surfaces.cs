using System;

namespace SimpleRaytracing
{
    public class Surfaces
    {
        public class Shiny : Surface
        {
            public float roughness
            {
                get
                {
                    return 250;
                }
            }

            public Color diffuse(Vector pos)
            {
                return Color.white;
            }

            public float reflect(Vector pos)
            {
                return 0.7F;
            }

            public Color specular(Vector pos)
            {
                return Color.grey;
            }
        }

        public class CheckerBoard : Surface
        {
            public float roughness
            {
                get
                {
                    return 150;
                }
            }

            public Color diffuse(Vector pos)
            {
                if((int)(Math.Floor(pos.z) + Math.Floor(pos.x)) % 2 != 0)
                {
                    return Color.white;
                }

                return Color.black;
            }

            public float reflect(Vector pos)
            {
                if ((int)(Math.Floor(pos.z) + Math.Floor(pos.x)) % 2 != 0)
                {
                    return 0.1F;
                }

                return 0.7F;
            }

            public Color specular(Vector pos)
            {
                return Color.white;
            }
        }
    }
}
