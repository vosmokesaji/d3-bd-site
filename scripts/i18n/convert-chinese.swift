// Site prose only. Official term references remain tokens until runtime.
import Foundation
let data = FileHandle.standardInput.readDataToEndOfFile()
let values = try JSONDecoder().decode([String: String].self, from: data)
let transform = StringTransform(CommandLine.arguments.count > 1 && CommandLine.arguments[1] == "zhCN" ? "Hant-Hans" : "Hans-Hant")
let result = values.mapValues { $0.applyingTransform(transform, reverse: false) ?? $0 }
let encoder = JSONEncoder(); encoder.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
FileHandle.standardOutput.write(try encoder.encode(result))
