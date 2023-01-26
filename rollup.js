import fs from "node:fs"
import { resolvePath } from "./lib/util/node.js"
import { each } from "./lib/util/index.js"

import commonjs from "@rollup/plugin-commonjs"
import alias from "@rollup/plugin-alias"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { uglify } from "rollup-plugin-uglify"

export default function(banner, pkg) {
    function _({ src, dest, name: _name }) {
        const name = `${pkg.name}${ _name ? `-${_name}` : "" }.js`
        return {
            name, 
            input: src.startsWith(".") ? src : `./src/${src}`,
            output: {
                file: dest.startsWith(".") ? dest : `./public/js/${dest}`,
                strict: true,
                sourcemap: true,
                format: "es"
            },
            plugins: [
                nodeResolve({
                    preferBuiltins: false
                }),
                alias({
                    entries: [
                        {
                            find: /^\@\/src\//,
                            replacement: resolvePath("./src", import.meta) + "/"
                        },
                        {
                            find: /^\@\/lib\//,
                            replacement: resolvePath("./lib", import.meta) + "/"
                        },
                        {
                            find: /^\@\/core\//,
                            replacement: resolvePath("./lib/core", import.meta) + "/"
                        },
                        {
                            find: /^\@\/util\//,
                            replacement: resolvePath("./lib/util", import.meta) + "/"
                        }
                    ]
                }),
                commonjs(),
                uglify({
                    output: {
                        preamble: banner(name)
                    }
                })
            ]
        }
    }
    
    const output = [
        // bundle.js
        _({
            src: "./index.js",
            dest: "bundle.min.js",
            name: "bundle"
        }),
        
        // core
        _({
            src: "./lib/core/index.js",
            dest: "lib/core.min.js",
            name: "core"
        })
    ]
    
    // extension packs
    const extensions = fs.readdirSync("./src/extensions")
    each(extensions, fullname => {
        const name = fullname.split(".")[0]
        output.push(_({
            src: `extensions/${fullname}`,
            dest: `extensions/${name}.min.js`,
            name: `extensions-packs-${name}`
        }))
    })
    
    return output
}
