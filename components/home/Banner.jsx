import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ALL_COLOR } from "../../constant/all-color";
import BannerImage from "../../assets/food.png";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        height: 123,
        borderRadius: 30,
        backgroundColor: ALL_COLOR["--bg-color"],
        paddingLeft: 9,
        paddingTop: 13,
        paddingBottom: 16,
        paddingRight: 9,
        flexDirection: "row",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "column", gap: 8 }}>
        <Text
          style={{
            color: ALL_COLOR["--white"],
            fontWeight: "medium",
            fontSize: 16,
          }}
        >
          {t("banner.subtitle")}{" "}
          <Text style={{ fontWeight: "bold" }}>{t("banner.discount")}</Text>
        </Text>
        <Text
          style={{
            color: ALL_COLOR["--white"],
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {t("banner.promo")}
        </Text>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: ALL_COLOR["--white"],
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              height: 34,
              width: 112,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: ALL_COLOR["--bg-color"],
              }}
            >
              {t("banner.buyNow")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={BannerImage}
        style={{
          borderRadius: 16,
          height: 96,
        }}
      />
    </View>
  );
};

export default Banner;
