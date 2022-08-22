import DB from "../../models/db";
import express from "express";
import SiteCardFormattingWrapper from "../../formatting/siteCardFormattingWrapper";

const FAQRouter = express.Router();
export default FAQRouter;

const faqpages = ["general", "rules", "ll01", "ll02", "ll03", "ll04", "ll05", "ll06", "ll07", "ll08", "ll09", "ll10", "ll11", "ll12", "ll13", "ll14", "ll15", "ll16", "ll17"];

FAQRouter.get("/", (req, res) => {
    res.render("faq/index");
});

FAQRouter.get("/:faq/", (req, res) => {
    req.params.faq = req.params.faq.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    if (faqpages.indexOf(req.params.faq) === -1) req.params.faq = "index";
    res.render("faq/" + req.params.faq);
});