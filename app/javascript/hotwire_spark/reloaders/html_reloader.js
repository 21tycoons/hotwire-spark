import { Idiomorph } from "idiomorph/dist/idiomorph.esm.js"
import { log } from "../logger.js"
import { reloadHtmlDocument } from "../helpers.js"
import { StimulusReloader } from "./stimulus_reloader.js"

export class HtmlReloader {
  static async reload() {
    return new HtmlReloader().reload()
  }

  async reload() {
    await this.#reloadHtml()
    await this.#reloadStimulus()
  }

  async #reloadHtml() {
    try {
      log("Reload html...")

      const reloadedDocument = await reloadHtmlDocument()
      this.#updateBody(reloadedDocument.body)
    } catch (error) {
      console.error("Error reloading HTML:", error)
    }
  }

  async #reloadStimulus() {
    return new StimulusReloader().reload()
  }

  #updateBody(newBody) {
    Idiomorph.morph(document.body, newBody, {
      callbacks: {
        beforeNodeMorphed: function (oldNode, newNode) {
          const value = !(oldNode instanceof HTMLElement) || !oldNode.closest("turbo-cable-stream-source")
          return value
        }
      }
    })
  }
}
